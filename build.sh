npm run prod &&
rm -rf build &&
mkdir build &&
mkdir build/app
cp -r backend build/app &&
cp -r logs build/app &&
cp chatapp.conf build/app &&
cp chatapp_deploy build/app &&
cp README.md build/app &&
cp requirements.txt build/app &&
cp wsgi.py build/app &&
tar -cvf build/app.tar build/app
