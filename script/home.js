const loader = document.getElementById("loader");
const allBtn = document.getElementById("btn-all");
const openBtn = document.getElementById("btn-open");
const closeBtn = document.getElementById("btn-close");

const loadAllIssue = (type) => {
  loader.className = "block flex items-center justify-center min-h-[50vh]";
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      if (type === "all") {
        displayAllIssue(data.data);
        loader.className = "hidden";
      }
      if (type === "open") {
        const filterData = data.data?.filter((x) => x.status === "open");
        displayAllIssue(filterData);
        loader.className = "hidden";
      }
      if (type === "close") {
        const filterData = data.data?.filter((x) => x.status === "closed");
        displayAllIssue(filterData);
        loader.className = "hidden";
      }
    });
};

const displayAllIssue = (issues) => {
  const allIssue = document.getElementById("all-issue");
  allIssue.innerHTML = "";
  const totalCount = document.getElementById("total-issues");
  totalCount.innerText = `${issues.length} Issues`;
  for (issue of issues) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div
            onClick="loadIssueDetail(${issue.id})"
            class="bg-white py-4 px-4  rounded-[4px] border-t-3 border-[#00A96E] shadow-sm space-y-3 h-[320px] ${issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}"
          >
            <div class="flex items-center justify-between">
              <img src="${
                issue.status === "open"
                  ? "./assets/open.png"
                  : "./assets/close.png"
              }" alt="" />
              <button
                class="py-[4px] px-[15px] rounded-[100px]  lg:text-[12px] text-[10px] font-medium uppercase ${
                  issue.priority === "high"
                    ? "bg-[#FEECEC] text-[#EF4444] "
                    : issue.priority === "medium"
                      ? "bg-[#FFF6D1] text-[#F59E0B] "
                      : issue.priority === "low"
                        ? "bg-[#EEEFF2] text-[#9CA3AF] "
                        : ""
                } "
              >
                ${issue.priority}
              </button>
            </div>
            <h1 class="h-7 text-[12px] lg:text-[14px] font-semibold text-[#1F2937]">
              ${issue.title}
            </h1>
            <p class="truncate text-[10px] lg:text-[12px] text-[#64748B]">
              ${issue.description}
            </p>
            <div class="flex flex-wrap items-center gap-2">
            ${issue.labels
              ?.map((label) => {
                return `<button
                class="py-[4px] px-[5px] rounded-[100px] lg:text-[12px] text-[10px] font-medium flex items-center justify-center gap-1 text-center outline-1 uppercase ${
                  label === "bug"
                    ? "outline-[#FECACA] text-[#EF4444] bg-[#FEECEC]"
                    : label === "help wanted"
                      ? "outline-[#FDE68A] text-[#D97706] bg-[#FFF8DB]"
                      : label === "enhancement"
                        ? "bg-[#DEFCE8] outline-[#BBF7D0] text-[#00A96E]"
                        : label === "documentation"
                          ? "bg-[#CAF0F8] outline-[#90E0EF] text-[#0077B6]"
                          : label === "good first issue"
                            ? "bg-[rgb(222,188,225,30%)] outline-[#7E51B7] text-[#6A3EA3]"
                            : ""
                }"
              >
                <img class='size-3' src="${label === "bug" ? "./assets/bug.png" : label === "help wanted" ? "./assets/Lifebuoy.png" : label === "enhancement" ? "./assets/Sparkle.png" : label === "documentation" ? "./assets/docs.png" : label === "good first issue" ? "./assets/good issue.png" : ""}" alt="" />
                ${label}
              </button>`;
              })
              .join("")}
            </div>
            <hr class=" border-1 border-[#E4E4E7] my-10" />
            <div class="space-y-2">
              <p class="text-[10px] lg:text-[12px] text-[#64748B]">
                #${issue.id} by ${issue.assignee ? issue.assignee : "No Name"} 
              </p>
              <p class="text-[10px] lg:text-[12px] text-[#64748B]">
                ${issue.createdAt}
              </p>
            </div>
          </div>
        `;
    allIssue.appendChild(div);
  }
};

allBtn.addEventListener("click", () => {
  allBtn.className = "active";
  openBtn.className = "inactive";
  closeBtn.className = "inactive";
  loadAllIssue("all");
});
openBtn.addEventListener("click", () => {
  allBtn.className = "inactive";
  openBtn.className = "active";
  closeBtn.className = "inactive";
  loadAllIssue("open");
});
closeBtn.addEventListener("click", () => {
  allBtn.className = "inactive";
  openBtn.className = "inactive";
  closeBtn.className = "active";
  loadAllIssue("close");
});

const loadIssueDetail = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const details = await res.json();
  displayIssueDetail(details.data);
};

const displayIssueDetail = (details) => {
  const modalMake = document.getElementById("modal");
  modalMake.innerHTML = `
  <h1 class="font-bold text-[24px]">${details.title}</h1>
            <div class="flex items-center gap-2">
              <span class=" text-white py-[7px] px-[12px] rounded-[100px] ${details.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"} ">${details.status}</span>
              <div class="bg-[#64748B] rounded-[50%] size-[5px]"></div>
              <p class="text-[12px] text-[#64748B]">Opened by ${details.assignee ? details.assignee : "No Name"}</p>
               <div class="bg-[#64748B] rounded-[50%] size-[5px]"></div>
              <p class="text-[12px] text-[#64748B]">${details.createdAt}</p>
            </div>
           <div class="flex flex-wrap items-center gap-2">
            ${details.labels
              ?.map((label) => {
                return `<button
                class="py-[4px] px-[8px] rounded-[100px] lg:text-[12px] text-[10px] font-medium flex items-center justify-center gap-1 text-center outline-1 uppercase ${
                  label === "bug"
                    ? "outline-[#FECACA] text-[#EF4444] bg-[#FEECEC]"
                    : label === "help wanted"
                      ? "outline-[#FDE68A] text-[#D97706] bg-[#FFF8DB]"
                      : label === "enhancement"
                        ? "bg-[#DEFCE8] outline-[#BBF7D0] text-[#00A96E]"
                        : label === "documentation"
                          ? "bg-[#CAF0F8] outline-[#90E0EF] text-[#0077B6]"
                          : label === "good first issue"
                            ? "bg-[rgb(222,188,225,30%)] outline-[#7E51B7] text-[#6A3EA3]"
                            : ""
                }"
              >
                <img class='size-3' src="${label === "bug" ? "./assets/bug.png" : label === "help wanted" ? "./assets/Lifebuoy.png" : label === "enhancement" ? "./assets/Sparkle.png" : label === "documentation" ? "./assets/docs.png" : label === "good first issue" ? "./assets/good issue.png" : ""}" alt="" />
                ${label}
              </button>`;
              })
              .join("")}
            </div>
            <p class="text-[16px] text-[#64748B]">${details.description}</p>

            <div class="bg-[#F8FAFC] p-[16px] rounded-[8px] flex items-center gap-40">
              <div>
                <p class="text-[16px] text-[#64748B]">Assignee:</p>
                <p class="font-semibold text-[16px]"> ${details.assignee ? details.assignee : "No Name"}</p>
              </div>
              <div>
                <p class="text-[16px] text-[#64748B] mb-[3px]">Priority:</p>
                <button
                class="py-[4px] px-[15px] rounded-[100px]  text-[12px]  font-medium uppercase ${
                  details.priority === "high"
                    ? "bg-[#EF4444] text-white "
                    : details.priority === "medium"
                      ? "bg-[#F59E0B] text-white "
                      : details.priority === "low"
                        ? "bg-[#9CA3AF] text-white "
                        : ""
                } "
              >
                ${details.priority}
              </button>
              </div>

            </div>

            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn font-semibold text-[16px] text-white bg-[#4A00FF] rounded-[4px]">Close</button>
              </form>
            </div>
  
  `;
  document.getElementById("my_modal_5").showModal();
};



loadAllIssue("all");
