# Python 3 server example
import ast
import base64
from cgitb import text
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
import logging
from LetterDimension import Compute_Dimension
hostName = "localhost"
serverPort = 5001

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
    def _json(self, message):
        """This just generates an HTML document that includes `message`
        in the body. Override, or re-write this do do more interesting stuff.
        """
        content = f"<html><body><h1>{message}</h1></body></html>"
        return content.encode("utf8")  # NOTE: must return a bytes object!

    def do_POST(self):

        data = json.dumps({'hello': 'world', 'received': 'ok'})

        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-type", "application/json")
        self.send_header("body", data)
        self.end_headers()

        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), post_data.decode('utf-8'))

        text_imageBase64 = json.loads(post_data.decode('utf-8'))['neonText']
        text_imageBase64 = text_imageBase64.replace('data:image/png;base64,','')
        text_imageBase64 = bytes(text_imageBase64,'utf-8')
        fh = open("imageToSave.png", "wb")
        decoded_data = base64.b64decode((text_imageBase64))

        fh = open("imageToSave.png", "wb")
        fh.write(decoded_data)
        fh.close()

        # Computing Dimensions!
        result = Compute_Dimension("imageToSave.png")
        # print(result)
        encoded = base64.b64encode(open("computedImage.png", "rb").read())
        self.wfile.write(encoded)



if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
