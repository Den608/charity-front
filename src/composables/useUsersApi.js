import { isVNode, ref, withScopeId } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useUsersApi() {
  const users = ref([]);
  const lastPage = ref(1);
  const currentPage = ref(1);
  const usersCount = ref(0);
  const user_role = ref("");
  const errorInput = ref("");
  const userLoading = ref(false);
  const componentStore = useComponentStore();
  const { showLoading, dismissLoading, showPopup } = componentStore;
  let timerId;

  async function setAllUsers(role) {
    try {
      userLoading.value = true;
      const response = await axiosInstance.get(`/api/users?role=${role}`);
      users.value = response.data.users;
      usersCount.value = response.data.count;
      lastPage.value = Math.ceil(usersCount.value / 10);
      user_role.value = role;
    } catch (error) {
      showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error");
    } finally {
      userLoading.value = false;
    }
  }

  async function createUser(user) {
    let isValid;
    let message = "";
    try {
      isValid = validate_fields(user);
      user["role"] = user_role.value;
      const response = await axiosInstance.post(
        `/api/register/${user_role.value}`,
        user
      );
      showPopup("با موفقیت افزوده شد !!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      if ("username" in error.response.data.errors) {
        message = "کاربری با این نام کاربری قبلا در سیسستم ثبت شده";
      } else if ("national_code" in error.response.data.errors) {
        message = "کاربری با این کد ملی قبلا در سیستم ثبت شده است ";
      } else if ("email" in error.response.data.errors) {
        message = "کاربری با این ایمیل قبلا در سیستم ثبت شده است ";
      } else if (isValid) {
        errorInput.value = error.message;
      } else {
        showPopup(message, "error");
      }
    } finally {
      if(message){
        showPopup(message,'error')
      }
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function updateUser(user) {
    let isValid;
    try {
      isValid = validate_fields(user);
      const response = await axiosInstance.put(`/api/users/${user.id}`, user);
      showPopup("با موفقیت انجام شد !!!", "success");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      let message = "";
      if ("username" in error.response.data.errors) {
        message = "کاربری با این نام کاربری قبلا در سیسستم ثبت شده";
      } else if ("national_code" in error.response.data.errors) {
        message = "کاربری با این کد ملی قبلا در سیستم ثبت شده است ";
      } else if ("email" in error.response.data.errors) {
        message = "کاربری با این ایمیل قبلا در سیستم ثبت شده است ";
      } else {
        message = "خطایی در سیستم رخ داده است !!! با پشتیبانی ارتباط بگیرید";
      }

      if (!isValidّ) {
        errorInput.value = error.message;
      } else {
        showPopup(message, "error");
      }
    } finally {
      setTimeout(() => {
        errorInput.value = "";
      }, 500);
    }
  }

  async function deleteUsers(userList = []) {
    if (userList.length > 0) {
      let user_ids = [];
      userList.map((obj) => user_ids.push(obj.id));
      try {
        await axiosInstance.post(`/api/users/delete-multi`, {
          user_ids: user_ids,
        });
        showPopup("کاربران با موفقیت حذف شدند !!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        showPopup("مشکلی پیش امده با پشتیبانی تماس حاصل نمایید", "error");
      }
    }
  }

  async function filterUser(filter_field) {
    let url = "";
    if (checkInputType(filter_field) == "name") {
      let name = filter_field.split(" ");
      if (name.length > 1) {
        url = `/api/users?role=${user_role.value}&first_name=${name[0]}&last_name=${name[1]}`;
      } else {
        url = `/api/users?role=${user_role.value}&first_name=${name[0]}&last_name=${name[0]}`;
      }
    } else if (checkInputType(filter_field) == "national_code") {
      url = `/api/users?role=${user_role.value}&national_code=${filter_field}`;
    }

    if (url != "") {
      try {
        userLoading.value = true;
        const response = await axiosInstance.get(url);
        users.value = response.data.users;
        usersCount.value = response.data.count;
        lastPage.value = Math.ceil(usersCount.value / 10);
      } catch (error) {
        showPopup(
          "مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید",
          "error"
        );
      } finally {
        userLoading.value = false;
      }
    }
  }

  async function filterUserDebounced(filter_field = " ") {
    clearTimeout(timerId);

    timerId = setTimeout(async () => {
      await filterUser(filter_field);
    }, 1000);
  }

  async function nextPage() {
    if (currentPage.value < lastPage.value) {
      try {
        userLoading.value = true;
        const response = await axiosInstance.get(
          `/api/users?role=${user_role.value}&&page=${++currentPage.value}`
        );
        users.value = response.data.users;
      } catch (error) {
        showPopup(
          "مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید",
          "error"
        );
      } finally {
        userLoading.value = false;
      }
    }
  }

  async function prevPage() {
    if (currentPage.value > 1) {
      try {
        userLoading.value = true;
        const response = await axiosInstance.get(
          `/api/users?role=${user_role.value}&&page=${--currentPage.value}`
        );
        users.value = response.data.users;
      } catch (error) {
        showPopup(
          "مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید",
          "error"
        );
      } finally {
        userLoading.value = false;
      }
    }
  }

  async function gotoPage(number) {
    if ((number <= lastPage.value) & (number > 0)) {
      try {
        userLoading.value = true;
        const response = await axiosInstance.get(
          `/api/users?role=${user_role.value}&&page=${number}`
        );
        users.value = response.data.users;
        currentPage.value = number;
      } catch (error) {
        showPopup(
          "مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید",
          "error"
        );
      } finally {
        userLoading.value = false;
      }
    }
  }

  function validate_fields(obj) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{4,12}$/;

    if (obj.username == "" && obj.username.length < 4) {
      throw new Error("فرمت نام کاربری صحیح نیست !!!");
    } else if ("password" in obj) {
      if (obj.password.length < 8)
        throw new Error("رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد ");
    } else if (obj.first_name.length < 3) {
      throw new Error("نام کاربر باید حداقل از 3 کاراکتر تشکیل شده باشد ");
    } else if (obj.last_name.length < 3) {
      throw new Error(
        "نام خانوادگی کاربر باید حداقل از 3 کاراکتر تشکیل شده باشد "
      );
    } else if (!emailPattern.test(obj.email)) {
      throw new Error("فرمت ایمیل اشتباه است ");
    } else if (!phonePattern.test(obj.phone_number)) {
      throw new Error("فرمت شماره تلفن اشتباه است ");
    } else {
      return true;
    }
  }

  function checkInputType(input) {
    const nationalCodeRegex = /^\d{0,10}$/;

    if (!nationalCodeRegex.test(input)) {
      return "name";
    } else if (nationalCodeRegex.test(input)) {
      return "national_code";
    }
  }

  return {
    users,
    userLoading,
    usersCount,
    currentPage,
    lastPage,
    errorInput,
    setAllUsers,
    createUser,
    updateUser,
    deleteUsers,
    filterUserDebounced,
    nextPage,
    prevPage,
    gotoPage,
  };
}
