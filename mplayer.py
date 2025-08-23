from flask import Flask, url_for, render_template, send_file, request
from io import BytesIO
from mutagen import File
import glob
import json

app = Flask(__name__)

@app.route('/')
def home():
    musiclist = glob.glob('static/musics/*.mp3')

    musicj = [{'fileName': mi.split('/'[-1]), 'fileURL': url_for('sounds', music = mi), 'length': sec2minString(File(mi).info.length), 'Tags': None} for mi in musiclist]
    for i in range(len(musicj)):
        tag = File(musiclist[i])
        if('TIT2' in tag.keys()):
            musicj[i]['Tags'] = {'TIT2': tag['TIT2'].text[0], 'TPE1': tag['TPE1'].text[0]}
    return render_template('home.html', musicj=musicj)

@app.route('/sounds')
def sounds():
    music = request.args['music']
    return send_file(music, mimetype='audio/mp3')

@app.route('/coverImage')
def coverImage():
    cover = request.args['music']
    cover = File(cover)
    if ('APIC:' in cover.tags.keys()):
        imgcover = cover.tags['APIC:'].data
        strIO = BytesIO()
        strIO.write(imgcover)
        strIO.seek(0)

        return send_file(strIO, mimetype='image/jpg')
    
    else:
        return app.send_static_file('images/noCoverImage.png')

def sec2minString(sec):
    mi = sec/60.0
    mi = str(mi).split('.')
    seci = int(float('0.'+mi[1]) * 60.0)
    if seci < 10:
        seci = '0' + str(seci)
    else:
        seci = str(seci)
    
    return mi[0] + ':' + seci

if __name__ == '__main__':
    app.run(debug=True)
    