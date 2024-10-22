import asyncio
import websockets

async def handler(websocket, path):
    data = await websocket.recv()
    print(f"Data received: {data}")
    response = "Response from backend"
    await websocket.send(response)

start_server = websockets.serve(handler, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
