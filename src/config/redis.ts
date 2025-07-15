import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
  console.log('Conexão com Redis estabelecida');
});

redis.on('error', (err) => {
  console.error('Erro ao conectar com Redis:', err);
});

export default redis;