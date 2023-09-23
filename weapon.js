async function CreateWeapon(file, divId=null, base64=false)
{
    weaponJSON = await fetch("./weapons/" + file + ".json");
    parsedJSON = await weaponJSON.json();

    const weapon = document.createElement("div"); weapon.classList.add("weaponContainer");
    const header = document.createElement("div"); header.classList.add("header");
    const weaponIcon = document.createElement("img"); weaponIcon.src = "./images/" + parsedJSON.weaponIcon;

    // use image in its base64 format
    if(base64)
    weaponIcon.src = parsedJSON.weaponIcon;

    const headerText = document.createElement("div"); headerText.classList.add("headerText");
    const headerH1 = document.createElement("h1"); headerH1.innerHTML = parsedJSON.name;
    const headerSpan = document.createElement("span"); headerSpan.innerHTML = parsedJSON.damageType;
    const propertyIcons = document.createElement("div"); propertyIcons.classList.add("properties");

    const weaponInfo = document.createElement("div"); weaponInfo.classList.add("weaponInfo");
    const weaponWeight = document.createElement("span"); weaponWeight.innerHTML = parsedJSON.weight + " <i class='icon peso'></i>";
    const spacing = document.createElement("div"); spacing.style = "height: 5px";
    const weaponValue = document.createElement("span"); weaponValue.innerHTML = parsedJSON.value + " <i class='icon coins'></i>"
    
    const description = document.createElement("div"); description.classList.add("description");

    header.appendChild(weaponIcon);

    header.appendChild(headerText);
    headerText.appendChild(headerH1);
    headerText.appendChild(headerSpan);

    header.appendChild(weaponInfo);
    weaponInfo.appendChild(weaponWeight);
    weaponInfo.appendChild(spacing);
    weaponInfo.appendChild(weaponValue);

    weapon.appendChild(header);

    if(parsedJSON.propertyIcons)
    {
        headerText.appendChild(propertyIcons);
        propertyIcons.innerHTML = parsedJSON.propertyIcons;
    }

    if(parsedJSON.properties)
    {
        weapon.appendChild(description);
        parsedJSON.properties.forEach(propriedade => 
            {
                var descriptionSection = document.createElement("div"); descriptionSection.classList.add("descriptionSection");
                descriptionSection.innerHTML = propriedade.property;
                description.appendChild(descriptionSection);
            });
    }

    if(divId)
    {
        document.getElementById(divId).appendChild(weapon);
    } else {
        document.body.appendChild(weapon);
    }
}