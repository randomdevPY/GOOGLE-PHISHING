from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from router.user import router

app = FastAPI()
app.mount("/static", StaticFiles(directory="./public/static"), name="static")
app.include_router(router, prefix="/accounts")