FROM mcr.microsoft.com/devcontainers/java:3-21-trixie

ARG INSTALL_MAVEN="true"
ARG MAVEN_VERSION=""

ARG INSTALL_GRADLE="false"
ARG GRADLE_VERSION=""

RUN if [ "${INSTALL_MAVEN}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/sdkman/bin/sdkman-init.sh && sdk install maven \"${MAVEN_VERSION}\""; fi \
    && if [ "${INSTALL_GRADLE}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/sdkman/bin/sdkman-init.sh && sdk install gradle \"${GRADLE_VERSION}\""; fi

# Install official Apache Tomcat in a unified directory so tooling can
# auto-detect it and the default upstream welcome page is available.
ARG TOMCAT_VERSION="10.1.24"
ENV CATALINA_HOME=/opt/tomcat
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends ca-certificates curl imagemagick librsvg2-bin \
    && mkdir -p /opt/tomcat \
    && curl -fsSL "https://archive.apache.org/dist/tomcat/tomcat-10/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz" \
        -o /tmp/apache-tomcat.tar.gz \
    && tar -xzf /tmp/apache-tomcat.tar.gz -C /opt/tomcat --strip-components=1 \
    && rm -f /tmp/apache-tomcat.tar.gz \
    && chown -R vscode:vscode /opt/tomcat \
    && chmod -R u+rwX,go+rX /opt/tomcat \
    && chmod +x /opt/tomcat/bin/*.sh \
    && ln -sf /opt/tomcat/bin/catalina.sh /usr/local/bin/catalina.sh \
    && rm -rf /var/lib/apt/lists/*

# Install PlantUML jar for local diagram generation and editor integrations.
ENV PLANTUML_JAR=/opt/plantuml/plantuml.jar
RUN mkdir -p /opt/plantuml \
    && curl -fsSL "https://github.com/plantuml/plantuml/releases/latest/download/plantuml.jar" \
        -o "${PLANTUML_JAR}" \
    && chmod 0644 "${PLANTUML_JAR}" \
    && chown vscode:vscode "${PLANTUML_JAR}" \
    && printf '#!/usr/bin/env sh\nexec java -jar "${PLANTUML_JAR}" "$@"\n' > /usr/local/bin/plantuml \
    && chmod +x /usr/local/bin/plantuml

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
