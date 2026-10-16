document.getElementById("architectureForm")
.addEventListener("submit", function(event) {

    event.preventDefault();


    const deploymentModel = 
        document.getElementById("deploymentModel").value;
    
    const projectName =
        document.getElementById("projectName").value;

    const projectSize =
        document.getElementById("projectSize").value;

    const architectureType =
        document.getElementById("architectureType").value;

    let recommendation = "";
    let rationale = "";

    if (architectureType === "Monolithic") {

        recommendation = "Monolithic Architecture";

        rationale =
            "A monolithic architecture is often suitable for smaller solutions where simplicity, ease of deployment and lower operational complexity are priorities.";

    }

    else if (architectureType === "Microservices") {

        recommendation = "Microservices Architecture";

        rationale =
            "A microservices architecture is well suited to larger solutions that require independent deployment, scalability and service isolation.";

    }

    else if (architectureType === "Event Driven") {

        recommendation = "Event-Driven Architecture";

        rationale =
            "An event-driven architecture supports asynchronous communication, integration and real-time processing across systems.";

    }

    else if (architectureType === "Serverless") {

        recommendation = "Serverless Architecture";

        rationale =
            "A serverless architecture can reduce infrastructure management overhead while supporting highly elastic workloads.";

    }

    document.getElementById("results").innerHTML = `

        <div class="card shadow">

            <div class="card-body">

                <h4>
                    Recommendation for ${projectName}
                </h4>

                <h5 class="text-primary">
                    ${recommendation}
                </h5>

                <p>
                    <strong>Project Size:</strong>
                    ${projectSize}
                </p>

                <p>
                    <strong>Deployment Model:</strong>
                    ${deploymentModel}
                </p>

                <p>
                    ${rationale}
                </p>

            </div>

        </div>

    `;

});

document.getElementById("architectureForm")
.addEventListener("reset", function() {

    document.getElementById("results").innerHTML = `

        <div class="card">

            <div class="card-body">
                Submit the assessment form to view results.
            </div>

        </div>

    `;

});

document.getElementById("searchButton")
.addEventListener("click", async function() {

    const searchTerm =
        document.getElementById("apiSearch").value;

    if (!searchTerm) {

        document.getElementById("apiResults").innerHTML = `
            <div class="alert alert-warning">
                Please enter a search term.
            </div>
        `;

        return;
    }

    const response =
        await fetch(
            `https://api.github.com/search/repositories?q=${searchTerm}`
        );

    const data =
        await response.json();

    let resultsHtml = "";

    data.items.slice(0, 5).forEach(repo => {

        resultsHtml += `

            <div class="card mb-3">

                <div class="card-body">

                    <h5>
                        <a href="${repo.html_url}"
                           target="_blank">

                           ${repo.name}

                        </a>
                    </h5>

                    <p>
                        ${repo.description || "No description available."}
                    </p>

                    <p>
                        <strong>Owner:</strong>
                        ${repo.owner.login}
                    </p

                    <p>
                        <strong>Primary Language:</strong>
                        ${repo.language || "Not specified"}
                    </p>

                    <p>
                    <strong>Stars:</strong>
                    ${repo.stargazers_count}
                    </p>

                </div>

            </div>

        `;
    });

    document.getElementById("apiResults").innerHTML =
        resultsHtml;

});

document.getElementById("resetApiButton")
.addEventListener("click", function() {

    document.getElementById("apiSearch").value = "";

    document.getElementById("apiResults").innerHTML = `

        <div class="card">

            <div class="card-body">
                Enter a search term to retrieve architecture resources.
            </div>

        </div>

    `;

});

