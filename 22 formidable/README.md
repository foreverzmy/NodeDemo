# formidable模块：处理上传的文件

要正确的处理上传的文件，需要把表单的`enctype`属性设置为`multipart/form-data`，这个是适用于BLOB(大型二进制文件)的MIME类型。

formidable模块的流式解析器让它成为处理文件上传的绝佳选择，也就是说他能随着数据块的上传接受他们，解析他们，并吐出特定的部分。这种方式不仅快，还不会因为需要大量缓冲而导致内存膨胀，即便像视频这种大型文件，也不会把进程压垮。

在这个模块中，会提示`DeprecationWarning: os.tmpDir() is deprecated. Use os.tmpdir() instead.`，这是因为`formidable`引用了`os`模块，在新版本的`os`模块中，`os.tmpDir()`改成了`os.tmpdir()`，所以需要将`node_modules/lib/incoming_form.js`第29行的`os.tmpDir()`改成`os.tmpdir()`,或者做一个封装：
```javascript
if (!os.tmpDir) {
    os.tmpDir = os.tmpdir;
}
```