Fiz algumas coisas um pouco fora do design, mas acho que ficou bacana, outras foram porque não faziam sentido, como o 'underline' no menu do desktop. Na vida real a gente
sempre pode conversar com o designer sobre essas coisas

```
git clone http://github.com/cruzeiro99/in8_website &&
cd in8_website &&
npm install
```

#### Se não tiver parcel e nodemon instalado globalmente:
```
npm run server &&
firefox http://localhost:3000
```

#### Se der erro o método a cima e/ou tenha:
```
rm -rf dist .cache &&
npm install -g parcel-bundler nodemon &&
npm run dev:server &&
npm run dev:client &&
firefox http://localhost:3000
```