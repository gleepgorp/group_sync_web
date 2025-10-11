// Copyright (C) [year] [your name/organization]

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

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

await serverConfigs(fastify);
await serverPlugins(fastify);
await serverHooks(fastify);
await apiRoutes(fastify);

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

await start();
