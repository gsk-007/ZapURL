import rateLimit  from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs:  Number(process.env.RATE_LIMIT_WINDOW_MS) || 5 * 60 * 1000, 
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  skip(req ) {
      if(process.env.NODE_ENV=="test")return true
  return false
  },
})


