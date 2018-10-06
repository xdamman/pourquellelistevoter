import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
 

const cache = {};

export const getJSONFromCSVFile = (csvfile) => {
  if (cache[csvfile]) return Promise.resolve(cache[csvfile]);
  const filepath = path.resolve(`${__dirname}/../../data/${csvfile}.csv`);
  console.log(">>> loading", filepath);
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filepath)
    .on('error', (e) => {
      if (e.code === 'ENOENT') {
        return reject(new Error('File not found'));
      }
      console.error("csv error", JSON.stringify(e, null, '  '));
      return resolve([]);
    })
    .pipe(csv())
      .on('data', (d) => results.push(d))
      .on('end', () => {
          cache[csvfile] = results
          return resolve(results);
      })
      .on('error', (e) => {
        console.error("csv error", e);
        reject(e);
      });
    });
}

export async function getDataFromCSV(req, res) {
  let results;
  try {
    results = await getJSONFromCSVFile(req.params.csvfile);
    if (req.query.zipcode) {
      results = results.filter(r => r.zipcode === req.query.zipcode);
    }
    if (req.query.list) {
      results = results.filter(r => r.list.toLowerCase() === req.query.list.toLowerCase());
    }
    return res.send({ results, total: results.length });
  } catch (e) {
    return res.send({ error: e.message });
  }
}