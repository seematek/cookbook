#base image : tomcat9 with jre 11
FROM tomcat:9-jre11
#FROM aallam/tomcat-mysql

COPY target/cookbook.war /usr/local/tomcat/webapps/



