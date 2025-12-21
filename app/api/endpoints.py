from fastapi import APIRouter
import random

router = APIRouter()

FOOD_MENU = [
    "麻辣小龙虾",
    "牛肉粉",
    "养生白米粥",
    "香辣蟹",
    "牛油火锅",
    "花甲粉",
    "石锅青花椒鱼",
    "鱼籽豆腐",
]


@router.get("/menu")
async def get_menu():
    return {"menu": FOOD_MENU}


@router.get("/spin")
async def spin_wheel():
    # winner_index = random.randint(0, len(FOOD_MENU) - 1)
    winner_index = 2  # always return "养生白米粥" for fun
    return {"winner_index": winner_index, "winner_name": FOOD_MENU[winner_index]}
