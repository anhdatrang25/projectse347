function save() {
  let fname = document.getElementById("fname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = "";
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("female").value;
  }

  if (fname.trim().length <= 2) {
    document.getElementById("fname-error").innerHTML = "Vui lòng nhập lại!!!";
  } else {
    document.getElementById("fname-error").innerHTML = "";
  }

  if (email.trim().length <= 2) {
    document.getElementById("email-error").innerHTML = "Nhập lại email!!!";
  } else if (!checkEmail(email)) {
    document.getElementById("email-error").innerHTML = "Nhập lại email!!!";
  } else {
    document.getElementById("email-error").innerHTML = "";
  }

  if (phone.trim().length < 10 || phone.trim().length > 10) {
    document.getElementById("phone-error").innerHTML = "Nhập lại số phone!!!";
  } else {
    document.getElementById("phone-error").innerHTML = "";
  }

  if (address.trim().length <= 1) {
    document.getElementById("address-error").innerHTML = "Nhập lại số phone!!!";
  } else {
    document.getElementById("address-error").innerHTML = "";
  }

  if (fname && email && phone && address) {
    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    students.push({
      fname: fname,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });

    localStorage.setItem("students", JSON.stringify(students));

    this.renderListStudent();
  }
}

function checkEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function renderListStudent() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  if (students.length === 0) return false;
  let tableContent = `<tr>
        <th>STT</th>
        <th>Họ và tên</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Địa chỉ</th>
        <th>Giới tính</th>
        <th>Hành động</th></tr>`;

  students.forEach((student, index) => {
    let studentId = index;
    index++;
    let genderLabel = student.gender === male ? "Nữ" : "Nam";
    tableContent += `<tr>
     <td>${index}</td>
     <td>${student.fname}</td>
     <td>${student.email}</td>
     <td>${student.phone}</td>
     <td>${student.address}</td>
     <td>${genderLabel}</td>
     <td>
     <a href = '#'>Edit</a> |
      <a href = '#' onclick="deleteStudent(${studentId})">Delete</a> 
      </td></tr>`;
  });
  document.getElementById("grid-students").innerHTML = tableContent;
}

function deleteStudent(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  students.splice(id, 1);

  localStorage.setItem("students", JSON.stringify(students));
  renderListStudent();
}
