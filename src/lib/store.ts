import fs from 'fs'
import path from 'path'
import { getStore } from '@netlify/blobs'

const IS_NETLIFY = process.env.NETLIFY === 'true'
const DATA_DIR = path.join(process.cwd(), 'data')

let blobStore: any = null

function getBlobStore() {
  if (!blobStore) {
    blobStore = getStore({ name: 'lilian-artesanato-data' })
  }
  return blobStore
}

async function readJSONArrayLocal(file: string, fallback: any[] = []): Promise<any[]> {
  if (!fs.existsSync(file)) return fallback
  try {
    const value = JSON.parse(fs.readFileSync(file, 'utf8'))
    return Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

async function writeJSONArrayLocal(file: string, value: any[]): Promise<void> {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, JSON.stringify(value, null, 2), 'utf8')
}

export async function readNewsletter(): Promise<any[]> {
  if (IS_NETLIFY) {
    try {
      const result = await getBlobStore().getJSON('newsletter')
      return Array.isArray(result) ? result : []
    } catch {
      return []
    }
  }
  return readJSONArrayLocal(path.join(DATA_DIR, 'newsletter', 'newsletter.json'))
}

export async function writeNewsletter(list: any[]): Promise<void> {
  if (IS_NETLIFY) {
    await getBlobStore().setJSON('newsletter', list)
    return
  }
  return writeJSONArrayLocal(path.join(DATA_DIR, 'newsletter', 'newsletter.json'), list)
}

export async function readOrders(): Promise<any[]> {
  if (IS_NETLIFY) {
    try {
      const result = await getBlobStore().getJSON('orders')
      return Array.isArray(result) ? result : []
    } catch {
      return []
    }
  }
  return readJSONArrayLocal(path.join(DATA_DIR, 'orders', 'orders.json'))
}

export async function writeOrders(list: any[]): Promise<void> {
  if (IS_NETLIFY) {
    await getBlobStore().setJSON('orders', list)
    return
  }
  return writeJSONArrayLocal(path.join(DATA_DIR, 'orders', 'orders.json'), list)
}

export async function readLogs(): Promise<any[]> {
  if (IS_NETLIFY) {
    try {
      const result = await getBlobStore().getJSON('logs')
      return Array.isArray(result) ? result : []
    } catch {
      return []
    }
  }
  const file = path.join(DATA_DIR, 'logs', 'access.log')
  if (!fs.existsSync(file)) return []
  const content = fs.readFileSync(file, 'utf8')
  return content
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line)
      } catch {
        return null
      }
    })
    .filter(Boolean)
}

export async function appendLog(entry: any): Promise<void> {
  if (IS_NETLIFY) {
    const logs = await readLogs()
    logs.push(entry)
    await getBlobStore().setJSON('logs', logs)
    return
  }
  const dir = path.join(DATA_DIR, 'logs')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.appendFileSync(path.join(dir, 'access.log'), JSON.stringify(entry) + '\n', 'utf8')
}