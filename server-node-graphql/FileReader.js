var fs = require('fs')
    , es = require('event-stream');

var lineNr = 0;

class FileReader {

  constructor(filePath) {
    this.jsonData = [];
    this.reader = fs.createReadStream(filePath);
  }

  read(cb) {
    let self = this;
    this.reader
        .pipe(es.split())
        .pipe(es.mapSync(function(line){
            // pause the readstream
            self.reader.pause();

            lineNr += 1;
            if(!line.startsWith("#")) {
              let arr = line.split('\t');
              let obj = {
                  "rsid" : arr[0] ? arr[0] : '',
                  "chromosome" : arr[1]? arr[1] : '',
                  "position" : arr[2]? arr[2] : '',
                  "genotype" : arr[3]? arr[3] : ''
              };              
              self.jsonData.push(obj);
            }


            // resume the readstream, possibly from a callback
            self.reader.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file. ' + self.jsonData.length);
            cb(self.jsonData);
        })
    );
  }

}


module.exports = FileReader;