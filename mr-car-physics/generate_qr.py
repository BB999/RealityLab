#!/usr/bin/env python3
import qrcode
import socket

def get_local_ip():
    """ローカルIPアドレスを取得"""
    try:
        # ダミー接続でローカルIPを取得
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "localhost"

def main():
    # ローカルIPアドレスを取得
    ip = get_local_ip()
    # Viteのデフォルトポートは5173
    url = f"https://{ip}:5173"

    print(f"QRコード生成中: {url}")

    # QRコードを生成
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # 画像として保存
    img = qr.make_image(fill_color="black", back_color="white")
    img.save("public/qr_code.png")

    print(f"QRコードを public/qr_code.png に保存しました")
    print(f"アクセスURL: {url}")

if __name__ == "__main__":
    main()
