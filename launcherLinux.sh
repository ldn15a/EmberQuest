echo "\n\n"
echo "This launcher is only for Linux machines."
echo "If you are on Linux and this doesn't work then talk to me (Lucas) and I can look into it."
echo "For this script to work you must have Google Chrome and PHP install on your machine."
echo "\n\n"
php -S localhost:8000 -t ./ &
google-chrome --new-window http://localhost:8000