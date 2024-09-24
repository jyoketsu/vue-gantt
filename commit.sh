#!/bin/bash
▶ export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890

# 获取当前时间
# 使用 date 命令获取当前日期和时间，并使用 + 后面的格式字符串指定输出的格式，然后将结果赋值给变量 time
time=$(date "+%Y-%m-%d %H:%M:%S")

# 提示用户选择提交类型
# 使用 echo 命令输出提示信息到终端
echo "请选择提交类型："
options=("feat: 新功能" "fix: 修补bug" "docs: 文档" "style: 格式" "refactor: 重构" "test: 增加测试" "chore: 构建过程或辅助工具的变动" "build: 本地creator构建")
# select option in "${options[@]}"; do ... done: 这是一个 Bash 的 select 结构，用于提供一个菜单供用户选择。options 是一个数组，包含了用户可以选择的选项。用户选择的选项会赋值给变量 option。
select option in "${options[@]}"; do
   # case $option in ... esac: 这是一个 Bash 的 case 结构，用于根据变量的值执行不同的操作。
   case $option in
   *)
      # $(echo "$option" | cut -d ":" -f 1): 这行代码使用 cut 命令从用户选择的选项中提取出选项的首部，并将其赋值给变量 selected_option。-d ":" 指定了分隔符为 :，-f 1 指定了提取的字段为第一个字段。
      selected_option=$(echo "$option" | cut -d ":" -f 1)
      break
      ;;
   esac
done

# 提示用户输入其余的提交信息
# read -p "请输入提交信息（按 Enter 结束）: " message: 这是 read 命令，用于从用户输入中读取值并存储到变量 message 中。-p 选项用于显示提示信息。
read -p "请输入提交信息（按 Enter 结束）: " message

# 如果用户输入了提交信息，则使用用户输入的信息作为提交信息，否则使用默认时间作为提交信息
# if [ -n "$message" ]; then ... fi: 这是一个 Bash 的条件语句，用于判断变量 $message 是否非空。如果非空，则执行 then 和 fi 之间的代码块，否则跳过。
if [ -n "$message" ]; then
   memo="$selected_option: $message"
else
   memo="$selected_option: $time"
fi

echo "提交信息: $memo"

# 添加、提交和推送更改
git add .
git commit -m "$memo"
git push

# *) 是 Bash 中 case 结构中的一个分支，表示匹配所有其他情况。
# 在 case 结构中，*) 用于捕获除了之前列出的所有其他可能的情况。
# 通常，它被用作默认的分支，类似于 switch 语句中的 default 分支。
# 在上述脚本中，select 结构中的 case 分支使用了 *) 来捕获用户选择的选项不在预定义选项列表中的情况。当用户选择了一个不在预定义列表中的选项时，脚本会执行 *) 分支中的代码块，即赋值给 selected_option 并终止 select 结构的执行。
