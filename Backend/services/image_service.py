import os
import uuid
from werkzeug.utils import secure_filename
from config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS

def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )

def save_image(file):
    if not allowed_file(file.filename):
        raise Exception("Invalid file type")

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    filename = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4()}_{filename}"

    file_path = os.path.join(UPLOAD_FOLDER, unique_name)
    file.save(file_path)

    return {
        "filename": unique_name,
        "path": file_path
    }
