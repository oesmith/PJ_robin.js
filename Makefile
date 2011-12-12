all: pj_robin.min.js

clean:
	rm -f pj_robin.min.js

distclean: clean
	rm -f compiler.jar

compiler.jar:
	curl http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz | tar xz compiler.jar

pj_robin.min.js: compiler.jar
	java -jar compiler.jar --js pj_robin.js --js_output_file pj_robin.min.js
