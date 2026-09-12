import fs from 'fs'
import path from 'path'
import { getStore } from '@netlify/blobs'

const IS_NETLIFY =
  process.env.NETLIFY === 'true' ||
  process.env.NETLIFY_PLATFORM === 'netlify' ||
  !!process.env.DEPLOY_ID ||
  !!process.env.AWS_LAMBDA_FUNCTION_NAME
const DATA_DIR = path.join(process.cwd(), 'data')

let blobStore: any = null

function findNetlifyApiToken(): string | undefined {
  const direct = process.env.NETLIFY_API_PAT
  if (direct) return direct
  for (const key of Object.keys(process.env)) {
    if (key.startsWith('NETLIFY_API') || key.includes('API_PAT') || key.includes('API_PA')) {
      const value = process.env[key]
      if (typeof value === 'string' && value.startsWith('nfp_')) return value
    }
  }
  return undefined
}

function getBlobStore() {
  const apiToken = findNetlifyApiToken()
  const siteID = process.env.NETLIFY_SITE_ID || 'cf597f3c-1d0c-4e4c-a07c-750711d6d7dd'
  if (apiToken) {
    blobStore = getStore('lilian-artesanato-data', { siteID, token: apiToken })
  } else {
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
      const result = await getBlobStore().get('newsletter', { type: 'json' })
      return Array.isArray(result) ? result : []
    } catch {
      return []
    }
  }
  return readJSONArrayLocal(path.join(DATA_DIR, 'newsletter', 'newsletter.json'))
}

export async function getStoreDiagnostic() {
  try {
    const store = getBlobStore()
    let readProbe = 'skip'
    try {
      const probe = await (store as any).get('newsletter', { type: 'json' })
      readProbe = Array.isArray(probe) ? `ok:${probe.length}` : 'empty'
    } catch (err: any) {
      readProbe = 'ERR: ' + String(err?.message || err)
    }
    return {
      isNetlify: IS_NETLIFY,
      apiMode: !!findNetlifyApiToken(),
      storeName: store?.name,
      readProbe,
    }
  } catch (err: any) {
    return { isNetlify: IS_NETLIFY, storeName: 'ERROR: ' + String(err?.message || err) }
  }
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
      const result = await getBlobStore().get('orders', { type: 'json' })
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
      const result = await getBlobStore().get('logs', { type: 'json' })
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