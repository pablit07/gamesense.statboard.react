export function downloadExcelSheet(response) {

    const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
        let downloadFrame = document.getElementById("downloadFrame");
        if (!downloadFrame) {
            downloadFrame = document.createElement('iframe');
            downloadFrame.id = "downloadFrame";
            downloadFrame.style = "display: none;";
            document.getElementsByTagName('body')[0].appendChild(downloadFrame);
        }
        downloadFrame.src = responseData.s3_presigned1wk;
        console.log('It works!');
  }

