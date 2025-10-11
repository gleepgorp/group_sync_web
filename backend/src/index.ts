import Fastify from "fastify";
import serverConfigs from "@configs/index";
import serverPlugins from "@plugins/index";
import serverHooks from "@hooks/index";
import apiRoutes from "@routes/index";
import "dotenv/config";

const fastify = Fastify({
  logger: {
    ...(process.env.NODE_ENV !== "production" && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname"
        }
      }
    })
  }
});

serverConfigs(fastify);
serverPlugins(fastify);
serverHooks(fastify);
apiRoutes(fastify);

const start =  async () => {
  try {
    const port = Number(process.env.PORT) || 3002;
    const host = process.env.HOST;

    await fastify.listen({
      port,
      host
    });

    fastify.log.info(`Server listening at ${fastify.server.address}`);
  } catch (error) {
    fastify.log.error(error);
    fastify.log.info("Can't connect to DB");
    process.exit(1);
  }
};

start();
