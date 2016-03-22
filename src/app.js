
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
	size:null,
	score:null,
	creaBomba: [],
	creaZanahoria: [],
	random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	collide:function(){
		//maneja colisiones
		
		
		
		for(var bombas of this.creaBomba){
			var box=bombas.getBoundingBox();
			var boxbunny=this.sprConejo.getBoundingBox();
			if(cc.rectIntersectsRect(boxbunny, box)){
				bombas.setVisible(false);
				bombas.setPosition(0,0);
				this.score=0;
				alert("Game over, your score is 0.0000 review your life and try again sucker!");
			}
		}
		
			
		
		return true;
	},
	eat:function(){
		for(var carrot of this.creaZanahoria){
			var box=carrot.getBoundingBox();
			var boxbunny=this.sprConejo.getBoundingBox();
			if(cc.rectIntersectsRect(boxbunny, carrot)){
				carrot.setVisible(false);
				carrot.setPosition(0,0);
				this.score++;
				alert("New score: "+ this.score);
			}
		}
		
			
		
		return true;
		
	},
	
	mover:function(location, event){
		//mueve izq o der
		cc.log("Mover conejo");
		var  juego = event.getCurrentTarget();
		var ubicacion = location.getLocation();
		juego.sprConejo.setPosition(ubicacion.x,ubicacion.y);
	},
	
	carrot:function(){
		//genera zanahorias
		var zana = new cc.Sprite(res.zanahoria_png);
		//zana.setVisible(true);
		zana.setScale(0.8,0.8);
        zana.setPosition(this.random(290,750), this.size.height );
        this.addChild(zana, 1);
		var move2 = cc.moveTo(this.random(1,12), this.random(290, 750), -200);
		zana.runAction(move2);
		this.creaZanahoria.push(zana);
		//zana.setVisible(false);
		//zana.setPosition(0,0);
	},
	
	bombas:function(){
		//genera bombas
		var bomba = new cc.Sprite(res.bomba_png);
		bomba.setScale(0.8,0.8);
        bomba.setPosition(this.random(290,750), this.size.height );
        this.addChild(bomba, 1);
		var moveto = cc.moveTo(this.random(1,6), this.random(290, 750), -200);
		bomba.runAction(moveto);
		this.creaBomba.push(bomba);
		
		
	},
	
	nada:function(){
		return true;
		
	},
	//deadBunny:function(){
		//colisión con bomba
	//},
	//winner:function(){
		//colisión con zanahoria
	//},
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;
		this.size= size;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
		this.schedule(this.carrot, 3); 
		this.schedule(this.bombas,2);
		this.schedule(this.collide, 0, Infinity);
		this.schedule(this.eat, 0, Infinity);
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.nada,
			onTouchMoved: this.mover
			
		}, this);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});



