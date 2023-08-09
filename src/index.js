import express from 'express'
import * as url from 'url'
import userRoutes from './routes/userRouter.js'
import path from 'path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express()
const port = 8080

app.use(express.json())
app.use('/api/users', userRoutes)


app.get('*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'view', '404.html'));
})

app.listen(port, () => {
	console.log("app start listening...")
})