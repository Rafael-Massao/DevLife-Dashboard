from PIL import Image, ImageDraw
import os

# Garante que a pasta public/icons existe
os.makedirs("public/icons", exist_ok=True)

for tamanho, nome in [(192, "icon-192.png"), (512, "icon-512.png")]:
    img = Image.new("RGB", (tamanho, tamanho), "#0f172a")
    draw = ImageDraw.Draw(img)
    margem = tamanho // 6
    draw.ellipse(
        [margem, margem, tamanho - margem, tamanho - margem],
        outline="#34d399", width=tamanho // 20
    )
    img.save(f"public/icons/{nome}")
    print("gerado:", nome)