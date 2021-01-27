UI.AddSubTab(["Config", "SUBTAB_MGR"], "Cum Anti Aim");
UI.AddCheckbox(["Config", "Cum Anti Aim", "Cum Anti Aim"], "Aa On")

function cockAA() {
    if (UI.GetValue(["Config", "Cum Anti Aim", "Cum Anti Aim", "Aa On"]))
    AntiAim.SetOverride(1);
    AntiAim.SetFakeOffset(10);
    AntiAim.SetRealOffset(-60);
    AntiAim.SetLBYOffset(10);
}

function cockWater() {
    var font = Render.AddFont("Verdana", 11, 800);
    width = width - 168;
    Render.String(width + 92, 22, 0, "Cock AA = P", [255, 255, 255, 255], font);
}
Cheat.RegisterCallback("CreateMove", "cockAA")
Cheat.RegisterCallback("Draw", "cockWater")
