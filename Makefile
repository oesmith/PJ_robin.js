all: PJ_robin.min.js

clean:
	rm -f PJ_robin.min.js

distclean: clean
	rm -f compiler.jar

compiler.jar:
	curl http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz | tar xz compiler.jar

PJ_robin.min.js: compiler.jar
	java -jar compiler.jar --js PJ_robin.js --js_output_file PJ_robin.min.js
