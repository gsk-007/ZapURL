import rateLimit  from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs:  60 * 1000, 
  max: 10,
  skip(req ) {
      if(req.ip === '127.0.0.1')return true
  return false
  },
})


