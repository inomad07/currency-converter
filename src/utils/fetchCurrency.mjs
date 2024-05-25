import axios from 'axios';
import { parseString } from 'xml2js';
import { promisify } from 'util';
import { formatCurrencyDataFromXML } from './formatCurrencyXML.mjs';

const parseXmlString = promisify(parseString);

async function fetchXmlFromUrl(url) {
  try {
      const { data } = await axios.get(url);
      return data;
  } catch (error) {
      console.error("Error fetching XML:", error);
      throw error;
  }
}

export async function fetchAndParseXmlData(url) {
  const xmlCurrencyString = await fetchXmlFromUrl(url);

  const parsedXMLCurrencyData = await parseXmlString(xmlCurrencyString).catch(() => {
    console.error("Error parsing XML to object:", error);
    throw error;
  });

  return formatCurrencyDataFromXML(parsedXMLCurrencyData);
}
