from flask import jsonify

def success_response(message, data=None):
    return jsonify({
        "success": True,
        "message": message,
        "data": data
    })

def error_response(message):
    return jsonify({
        "success": False,
        "message": message
    })
