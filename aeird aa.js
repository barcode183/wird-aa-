UI.AddDropdown("Preset", ["Custom", "Treehouse"])
UI.AddCheckbox("Only on move")
UI.AddCheckbox("Weird jitter")
UI.AddCheckbox("Random yaw")
UI.AddCheckbox("Random pitch")
UI.AddSliderInt("Min Jitter", -180, 180)
UI.AddSliderInt("Max Jitter", -180, 180)
var local_player = Entity.GetLocalPlayer()
function treehouseAApreset()
{
    if(UI.GetValue("Preset") == 1)
    {
        UI.SetValue("Random yaw", 1)
        UI.SetValue("Random pitch", 1)
        UI.SetValue("Min Jitter", -180)
        UI.SetValue("Max Jitter", 180)
        UI.SetValue("Only on move", 0)
        UI.SetValue("Weird jitter", 0)
    }
}
function getVel(index) {
    local_velocity = Entity.GetProp(local_player, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(local_velocity[0] * local_velocity[0] + local_velocity[1] * local_velocity[1]);
}
function randomJitter() {
    if (!UI.GetValue("Weird jitter")) {
        local_velocity = getVel(Entity.GetLocalPlayer())
        velocity_int = parseInt(local_velocity).toString()
        min_jitter_value = UI.GetValue("Min Jitter")
        max_jitter_value = UI.GetValue("Max Jitter")
        if (UI.GetValue("Only on move")) {
            if (velocity_int == 0) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0)
            } else {
                jitter_offset = Math.ceil(Math.random() * (min_jitter_value - max_jitter_value) + max_jitter_value)
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_offset)
            }
        } else {
            jitter_offset = Math.ceil(Math.random() * (min_jitter_value - max_jitter_value) + max_jitter_value)
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_offset)
        }
    }
}
function weirdJitter() {
    if (UI.GetValue("Weird jitter")) {
        min_jitter_value = UI.GetValue("Min Jitter")
        max_jitter_value = UI.GetValue("Max Jitter")
        jitter_value = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset")
        if (UI.GetValue("Only on move")) {
            local_velocity = getVel(Entity.GetLocalPlayer())
            velocity_int = parseInt(local_velocity).toString()
            if (velocity_int == 0) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0)
            } else {
                if (jitter_value >= min_jitter_value) {
                    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_value - 1)
                }
                if (jitter_value <= min_jitter_value || jitter_value > max_jitter_value) {
                    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", max_jitter_value)
                }
            }
        } else {
            if (jitter_value >= min_jitter_value) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_value - 1)
            }
            if (jitter_value <= min_jitter_value || jitter_value > max_jitter_value) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", max_jitter_value)
            }
        }
    }
}
function randomYaw() {
    if (UI.GetValue("Random yaw")) {
        if (UI.GetValue("Only on move")) {
            local_velocity = getVel(Entity.GetLocalPlayer())
            velocity_int = parseInt(local_velocity).toString()
            if (velocity_int == 0) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0)
            } else {
                random_yaw = Math.round(Math.random() * (-180 - 180) + 180)
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", random_yaw)
            }
        } else {
            random_yaw = Math.round(Math.random() * (-180 - 180) + 180)
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", random_yaw)
        }
    }
}
function randomPitch() {
    if (UI.GetValue("Random pitch")) {
        if (UI.GetValue("Only on move")) {
            local_velocity = getVel(Entity.GetLocalPlayer())
            velocity_int = parseInt(local_velocity).toString()
            random_pitch = Math.round(Math.random() * 4)
            if (velocity_int == 0) {
                UI.SetValue("Anti-Aim", "Extra", "Pitch", 1)
            } else if (random_pitch == 1 || random_pitch == 4) {
                UI.SetValue("Anti-Aim", "Extra", "Pitch", random_pitch)
            }
        }
        random_pitch = Math.round(Math.random() * 4)
        if (random_pitch == 1 || random_pitch == 4) {
            UI.SetValue("Anti-Aim", "Extra", "Pitch", random_pitch)
        }
    }
}
Cheat.RegisterCallback("CreateMove", "randomJitter")
Cheat.RegisterCallback("CreateMove", "weirdJitter")
Cheat.RegisterCallback("CreateMove", "randomYaw")
Cheat.RegisterCallback("CreateMove", "randomPitch")
Cheat.RegisterCallback("CreateMove", "treehouseAApreset")
