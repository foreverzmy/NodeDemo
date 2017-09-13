# Node.js读取office文件

用Node.js读取office文件首先就业解析office文件的工作原理，其实office文件(包括doc/docx,xls/xlsx,ppt/pptx)都是zip包，然后封装了一些xml文件。可以直接将docx的包改后缀为.zip来打开观看(因为doc和docx格式是不同的，所以全部都用docx等x结尾的文件解析)。

例如`docx`文件，里面有 `_rels`、`customXml`、`docProps`、`word` 四个文件夹和一个 `[Content_Types].xml` 文件:

* `[Content_Types].xml`：文件中记录这个文件夹下所有文件的清单，
* `_rels`文件夹：存储文件的关系：
  * `.rels`：描述文档的结构；
* `customXml`：包含文档中显示的一些数据；
* `docProps`：包含office软件的属性，文件夹下有两个文件：
  * `App.xml`：记录了创建该文当的word程序的一些信息；
  * `Core.xml`：记录了该文档创建和修改的时间，用户名等；
* `word`文件夹下就是我们的文本内容。里面有几个主要的文件：
  * `document.xml`：这个就是文档的主要内容，记录了输入的文字字符；
  * `numbering.xml`：这个就是标题号，以及标题号的一些属性；
  * `theme`：主题；
  * `styles.xml`：这个就是样式列表；
  * `fontTable.xml`：文档中使用的字体表；
  * `settings.xml`文档的设置；
  * `endnotes.xml`：文档的尾注信息；
  * `webSettings.xml`：网页设置；

如上所述，每个文档部分具有特定的内容类型。类似于`web`中`HTML`描述页面结构，`CSS`描述页面样式。我们可以通过程序对其创建和修改来用程序实现office文件的创建、修改和读取。
