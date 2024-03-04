from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse

router = APIRouter()
templates = Jinja2Templates(directory="./public/templates")

@router.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse(request=request, name="pages/login.html")

@router.post("/process")
async def process(request: Request):
    data = await request.json()
    
    print(data.get("email"))
    print(data.get("password"))

    response = {"message": "Datos procesados con éxito", "status": 200}
    return JSONResponse(content=response, status_code=200)