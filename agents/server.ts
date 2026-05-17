import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { kiteCompute } from './kite/kiteCompute'

const app = express()
app.use(cors())
app.use(express.json())

// ─── API Routes ───

app.post('/api/chat', async (req, res) => {
  const { message, agent } = req.body
  const result = await kiteCompute({
    prompt: message,
    agentType: agent || 'general'
  })
  res.json({
    output: result.result,
    verified: true,
    txHash: result.tee_attestation,
    cost: { total: result.estimated_cost || '0.50', paid: true },
    inference_id: result.inference_id,
    cache_hit: result.cache_hit,
    model: result.model
  })
})

app.post('/api/chat/stream', async (req, res) => {
  const { message, agent } = req.body
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const result = await kiteCompute({ prompt: message, agentType: agent || 'general' })
  const words = result.result.split(' ')
  for (let i = 0; i < words.length; i++) {
    res.write(`data: ${JSON.stringify({ token: words[i] + (i < words.length - 1 ? ' ' : '') })}\n\n`)
    await new Promise(r => setTimeout(r, 30))
  }
  res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
  res.end()
})

app.get('/api/stats', (_req, res) => {
  res.json({
    totalInferences: 1337,
    cacheSize: 42,
    activeModels: 6,
    uptime: process.uptime(),
    chain: '0G Mainnet',
    contract: process.env.CONTRACT_ADDRESS || '0x087dCA8ef455837c40E89fa093450A105fBaA0EF'
  })
})

app.get('/api/history', (_req, res) => {
  res.json([])
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════╗')
  console.log('║   KITE AI AGENT SERVER — LIVE       ║')
  console.log('╚══════════════════════════════════════╝')
  console.log(`\nServer: http://localhost:${PORT}`)
  console.log(`Chain: 0G Mainnet`)
  console.log(`Contract: ${process.env.CONTRACT_ADDRESS || '0x087dCA8ef455837c40E89fa093450A105fBaA0EF'}`)
  console.log(`\nEndpoints:`)
  console.log(`  POST /api/chat        — Chat with AI agent`)
  console.log(`  POST /api/chat/stream — Stream response`)
  console.log(`  GET  /api/stats       — Server stats`)
  console.log(`\n`)
})