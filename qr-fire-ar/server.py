#!/usr/bin/env python3
"""
HTTPS server for AR.js
iPhoneのSafariでカメラアクセスするためにHTTPSが必要
"""

import http.server
import ssl
import os

# ポート番号
PORT = 8443

# 現在のディレクトリ
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# HTTPサーバーを作成
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(('0.0.0.0', PORT), handler)

# SSL証明書を作成（自己署名証明書）
print("自己署名証明書を作成中...")
os.system('openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes -subj "/C=JP/ST=Tokyo/L=Tokyo/O=Dev/CN=localhost"')

# SSLコンテキストを設定
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('server.pem')

# HTTPSサーバーにラップ
httpd.socket = ssl_context.wrap_socket(httpd.socket, server_side=True)

print(f"\nHTTPSサーバーを起動しました")
print(f"アクセス: https://192.168.0.137:{PORT}")
print(f"\niPhoneで以下の手順を実行:")
print(f"1. Safariで https://192.168.0.137:{PORT} にアクセス")
print(f"2. 証明書の警告が出たら「詳細を表示」→「Webサイトを閲覧」")
print(f"3. カメラ権限を許可")
print(f"4. Hiroマーカーにカメラを向ける")
print(f"\nCtrl+C で停止")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\nサーバーを停止しました")
    httpd.shutdown()
