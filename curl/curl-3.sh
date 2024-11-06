curl -s https://www.uni.lu/snt-en/research-groups/finatrax/ | awk '/<span class="heading-page__second-line">/,/<\/span>/' | sed -e 's/<[^>]*>//g'
