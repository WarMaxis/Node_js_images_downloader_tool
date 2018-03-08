# Node.js images downloader tool
Simple Node.js tool for download and compress images from current URLs list in .txt file.

Created by __[Michał Milanowski](https://www.linkedin.com/in/michalmilanowski/)__.

## Functions:
* download images from URLs list in .txt file
* compress this images

## How to start?
1. First, create ```list.txt``` file with list of URLs, written line by line without any characters, in main directory.

2. Example __list.txt__ file: 
```txt
http://www.examplesite.com/test/flowers.jpg
http://www.anotherexamplesite.pl/test2/people.png
```

3. Install dependencies
```bash
$ npm install
```

4. Run script
```bash
$ npm start
```

5. Script will create new directory, where images will be downloaded.

6. Script will create another directory, where images will be copied after compress.
