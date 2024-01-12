import os
import json
import chardet
def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding

LevelPath = "NewLevel.level"

#键
Scene_Name = "Scene"
MetaWorld_JSRootActor_Name = "MetaWorld_JSRootActor"
Guid_Name = "Guid"
Asset_Name = "Asset"

def remove_jsRootActor():
    count = 0
    encoding = get_file_encoding(LevelPath)
    NewSceneData = list()
    if os.path.exists(LevelPath):
        with open(LevelPath,"r",encoding=encoding) as f:
            data = json.load(f)
        SceneData = list(data[Scene_Name])
        n = len(SceneData)
        for i in range(n):
            if Asset_Name in SceneData[i] and SceneData[i][Asset_Name] == MetaWorld_JSRootActor_Name:
                # print(f'===> data: {SceneData[i]["Guid"]}')
                if 'Script' in SceneData[i] and SceneData[i]["Script"]["ScriptComponent"]:
                    NewSceneData.append(SceneData[i])
            else :
                NewSceneData.append(SceneData[i])
            # if i == 0:
            #     SceneData[i][Guid_Name] = "ScriptRootActorGuidFromUpgrade0"
            # elif i==1:
            #     SceneData[i][Guid_Name] = "ScriptRootActorGuidFromUpgrade1"
            # if i>1:
            #     if Asset_Name in SceneData[i] and SceneData[i][Asset_Name] == MetaWorld_JSRootActor_Name:
            #         count += 1
            #         continue
            # NewSceneData.append(SceneData[i])
        data[Scene_Name] = NewSceneData
        with open(LevelPath,"w",encoding=encoding) as f:
            json.dump(data,f)
          

    

if __name__ == '__main__':
    remove_jsRootActor()