// ** 通用表单验证方法
// ** 用户名
const usernameRegExp = /^[A-Za-z0-9]{5,20}$/;

export const validateUsername = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入用户名!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!usernameRegExp.test(value)) {
        callback(new Error("5-20位数字或字母，大小写字母均可！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!usernameRegExp.test(value)) {
        callback(new Error("5-20位数字或字母，大小写字母均可！"));
      } else {
        callback();
      }
    }
  }
};
// 姓名
// const nickNameRegExp = /^ {0,10}$/;

export const validateNickName = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入姓名!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      // if (!nickNameRegExp.test(value)) {
      // 	callback(new Error("文本输入，10字内！"));
      // } else {
      // 	callback();
      // }
      if (value.length > 10) {
        callback(new Error("文本输入，10字内！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (value.length > 10) {
        callback(new Error("文本输入，10字内！"));
      } else {
        callback();
      }
    }
  }
};

// ** 身份证
const idcarNoRegExp18 = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const idcarNoRegExp15 = /^[1-9]\d{5}\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
export const validateIdcardNo = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入身份证号!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (idcarNoRegExp18.test(value)) {
        callback();
      } else if (idcarNoRegExp15.test(value)) {
        callback();
      } else {
        callback(new Error("身份证格式有误！"));
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (idcarNoRegExp18.test(value)) {
        callback();
      } else if (idcarNoRegExp15.test(value)) {
        callback();
      } else {
        callback(new Error("身份证格式有误！"));
      }
    }
  }
};

// ** 电话号
const mobileRegExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
export const validateMobile = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入电话!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!mobileRegExp.test(value)) {
        callback(new Error("电话号码格式有误！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!mobileRegExp.test(value)) {
        callback(new Error("电话号码格式有误！"));
      } else {
        callback();
      }
    }
  }
};

// 邮箱
const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入邮箱!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式有误！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式有误！"));
      } else {
        callback();
      }
    }
  }
};

// 密码
const pwdRegExp = /^(?=.*[A-Za-z])(?=.*\d)[^]{7,}$/;
export const validatePwd = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入密码!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!pwdRegExp.test(value)) {
        callback(new Error("不少于6位数，需包含数字和字母，大小写字母均可！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!pwdRegExp.test(value)) {
        callback(new Error("不少于6位数，需包含数字和字母，大小写字母均可！"));
      } else {
        callback();
      }
    }
  }
};

// 组织名称
// const nickNameRegExp = /^ {0,10}$/;

export const validateOrgName = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入组织名称!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      // if (!nickNameRegExp.test(value)) {
      // 	callback(new Error("文本输入，10字内！"));
      // } else {
      // 	callback();
      // }
      if (value.length > 100) {
        callback(new Error("文本输入，100字内！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (value.length > 100) {
        callback(new Error("文本输入，100字内！"));
      } else {
        callback();
      }
    }
  }
};

export const validateOrgDescription = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入组织描述!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      // if (!nickNameRegExp.test(value)) {
      // 	callback(new Error("文本输入，10字内！"));
      // } else {
      // 	callback();
      // }
      if (value.length > 500) {
        callback(new Error("文本输入，500字内！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (value.length > 500) {
        callback(new Error("文本输入，500字内！"));
      } else {
        callback();
      }
    }
  }
};
// 角色名称
export const validateRoleName = (rule: any, value: any, callback: any) => {
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入角色名称!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      // if (!nickNameRegExp.test(value)) {
      // 	callback(new Error("文本输入，10字内！"));
      // } else {
      // 	callback();
      // }
      if (value.length > 100) {
        callback(new Error("文本输入，100字内！"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (value.length > 100) {
        callback(new Error("文本输入，100字内！"));
      } else {
        callback();
      }
    }
  }
};

// 确认密码
export const validateConfirmPwd = (rule: any, value: any, callback: any, newPwd: any) => {
  // console.log(rule, value, callback, newPwd);
  console.log(value);
  console.log(newPwd);
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入确认密码!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      // if (!nickNameRegExp.test(value)) {
      // 	callback(new Error("文本输入，10字内！"));
      // } else {
      // 	callback();
      // }
      if (value != newPwd) {
        console.log("butong");
        callback(new Error("与新密码不同"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (value == newPwd) {
        callback(new Error("与新密码不同"));
      } else {
        callback();
      }
    }
  }
};

// ip地址
const IPAddressRegExp = /^([0-9]*\.){3}[0-9]+$/;
// const IPAddressRegExp = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
export const validateIPAddress = (rule: any, value: any, callback: any) => {
  // console.log(rule, value, callback, newPwd);
  console.log(value);
  if (rule.required) {
    if (!value || value.length === 0) {
      callback(new Error("请输入授权IP!"));
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      // if (!nickNameRegExp.test(value)) {
      // 	callback(new Error("文本输入，10字内！"));
      // } else {
      // 	callback();
      // }
      if (!IPAddressRegExp.test(value)) {
        callback(new Error("IP地址格式不正确"));
      } else {
        callback();
      }
    }
  } else {
    if (!value || value.length === 0) {
      callback();
    } else {
      // if(!projectEstablishFormRef.value) return
      // projectEstablishFormRef.value.validateField('projectName', ())
      if (!IPAddressRegExp.test(value)) {
        callback(new Error("IP地址格式不正确"));
      } else {
        callback();
      }
    }
  }
};
