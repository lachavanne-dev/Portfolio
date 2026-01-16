import base64
import os

def image_to_base64(path):
    with open(path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

base_path = "/Users/paullachavanne/Documents/Projets_Perso/Portfolio_remastered/portfolio-app/assets"
color_path = os.path.join(base_path, "kah_color.png")
depth_path = os.path.join(base_path, "kah_depth.png")

color_b64 = image_to_base64(color_path)
depth_b64 = image_to_base64(depth_path)

js_content = f"""
window.KAH_ASSETS = {{
  color: "data:image/png;base64,{color_b64}",
  depth: "data:image/png;base64,{depth_b64}"
}};
"""

with open("/Users/paullachavanne/Documents/Projets_Perso/Portfolio_remastered/portfolio-app/kah_assets.js", "w") as js_file:
    js_file.write(js_content)

print("kah_assets.js created successfully")
