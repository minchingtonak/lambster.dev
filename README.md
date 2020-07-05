## Quick Setup

First clone this repo and `cd` into the directory. Then:

1. `virtualenv --python=python3 env`
2. `./env/bin/activate`
3. `pip install nodeenv`
4. `nodeenv --python-virtualenv env`
5. `deactivate`
6. `./env/bin/activate`
7. `npm i .`
8. `npm run watch`