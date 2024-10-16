#version 330 core
out vec4 FragColor;
in vec2 TexCoord;
in vec3 FragPos;
in vec3 Normal;

uniform sampler2D texture1;
uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 objectColor;
uniform bool useTexture;
uniform bool useShading;

void main()
{
    vec4 texColor = texture(texture1, TexCoord);
    
    // Discard fragments with very low alpha
    if(useTexture && texColor.a < 0.1)
        discard;
    
    vec3 result;
    
    if (useShading)
    {
        // Ambient
        float ambientStrength = 0.1;
        vec3 ambient = ambientStrength * lightColor;
  	
        // Diffuse 
        vec3 norm = normalize(Normal);
        vec3 lightDir = normalize(lightPos - FragPos);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = diff * lightColor;
            
        if (useTexture) {
            result = (ambient + diffuse) * texColor.rgb;
        } else {
            result = (ambient + diffuse) * objectColor;
        }
    }
    else
    {
        // Unshaded rendering
        if (useTexture) {
            result = texColor.rgb;
        } else {
            result = objectColor;
        }
    }
    
    float alpha = useTexture ? texColor.a : 1.0;
    FragColor = vec4(result, alpha);
}