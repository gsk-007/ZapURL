import rateLimit  from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs:  60 * 1000, 
  max: 10,
  skip(req ) {
      if(process.env.NODE_ENV=="test")return true
  return false
  },
})


