// storage-adapter-import-placeholder
// import { s3Storage } from '@payloadcms/storage-s3';
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import collections from './collections'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URI || '',
  //   },
  // }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    // s3Storage({
    //   collections: {
    //     media: {
    //       prefix: 'media',
    //     },
    //   },
    //   bucket: process.env.S3_BUCKET!,
    //   config: {
    //     forcePathStyle: true,
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    //     },
    //     region: process.env.S3_REGION!,
    //     endpoint: process.env.S3_ENDPOINT!,
    //   },
    // })
  ],
})
