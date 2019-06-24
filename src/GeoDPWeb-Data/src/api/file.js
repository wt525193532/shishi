const fileApi = process.env.VUE_APP_FILE_API;
const fileServer = {
  upload: `${fileApi}/api/fileServer/Upload`,
  view: `${fileApi}/api/fileServer/view?fileName=`,
  download: `${fileApi}/api/fileServer/download?fileName=`,
  delete: `${fileApi}/api/fileServer/delete?fileName=`
};

export default fileServer;
