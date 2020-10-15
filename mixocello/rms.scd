

(
n = NetAddr("127.0.0.1", 6666);
~dirt.startSendRMS;
OSCFunc({ |msg|
	defer {
        n.sendMsg("/rms", msg);
	}
}, "/rms");

)
